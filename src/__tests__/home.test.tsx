import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Home } from '@/pages/home';
import type {CoinData} from "@/types.ts";

// Mock child components
vi.mock('@/components/header', () => ({ Header: () => <header>Header</header> }));
vi.mock('@/components/coin-printer', () => ({
    CoinPrinter: ({ coins }: { coins: CoinData[] }) => (
        <ul>
            {coins.map((c: CoinData) => <li key={c.id}>{c.name} - ${c.marketCap}</li>)}
        </ul>
    )
}));

describe('Home Page', () => {
    const mockResponse = {
        Data: {
            LIST: [
                { ID: 1, NAME: 'Bitcoin', SYMBOL: 'BTC', PRICE_USD: 50000, CIRCULATING_MKT_CAP_USD: 1000, LOGO_URL: 'btc.png' },
                { ID: 2, NAME: 'Ethereum', SYMBOL: 'ETH', PRICE_USD: 3000, CIRCULATING_MKT_CAP_USD: 2000, LOGO_URL: 'eth.png' }
            ]
        }
    };

    beforeEach(() => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockResponse)
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('renders and sorts coins by marketCap descending', async () => {
        render(<Home />);

        // Wait for data to render
        await waitFor(() => {
            expect(screen.getByText(/Ethereum/)).toBeInTheDocument();
        });

        const listItems = screen.getAllByRole('listitem');
        // Ethereum has 2000 cap, Bitcoin has 1000 cap. Ethereum should be first.
        expect(listItems[0]).toHaveTextContent('Ethereum - $2000');
        expect(listItems[1]).toHaveTextContent('Bitcoin - $1000');
    });

    it('polls the API every 3 seconds', async () => {
        vi.useFakeTimers();
        render(<Home />);

        // Initial call
        expect(globalThis.fetch).toHaveBeenCalledTimes(1);

        // Advance 3 seconds
        await act(async () => {
            vi.advanceTimersByTime(3000);
        });
        expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    });
});