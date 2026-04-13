import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Favourites } from '@/pages/favourites';
import { useLocalStorage } from 'react-use';
import type {CoinData} from "@/types.ts";

// Mock react-use to control the favourites list
vi.mock('react-use', () => ({
    useLocalStorage: vi.fn(),
}));

// Mock child components
vi.mock('@/components/header', () => ({ Header: () => <header>Header</header> }));
vi.mock('@/components/coin-printer', () => ({
    CoinPrinter: ({ coins }: { coins: CoinData[] }) => (
        <ul>
            {coins.map((c: CoinData) => <li key={c.id}>{c.name}</li>)}
        </ul>
    )
}));

describe('Favourites Page', () => {
    const mockFavs = [1, 2];
    const setFavsMock = vi.fn();

    beforeEach(() => {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        vi.mocked(useLocalStorage).mockReturnValue([mockFavs, setFavsMock]);

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                Data: {
                    '1': { ID: 1, NAME: 'Bitcoin', SYMBOL: 'BTC', PRICE_USD: 50000, TOTAL_MKT_CAP_USD: 1000, LOGO_URL: '' },
                    '2': { ID: 2, NAME: 'Ethereum', SYMBOL: 'ETH', PRICE_USD: 3000, TOTAL_MKT_CAP_USD: 2000, LOGO_URL: '' }
                }
            })
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('fetches coins based on favourites from localStorage', async () => {
        render(<Favourites />);

        await waitFor(() => {
            expect(globalThis.fetch).toHaveBeenCalledWith(
                expect.stringContaining('assets=1,2')
            );
        });

        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
        expect(screen.getByText('Ethereum')).toBeInTheDocument();
    });

    it('refetches when favourites change', async () => {
        const { rerender } = render(<Favourites />);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        vi.mocked(useLocalStorage).mockReturnValue([[1], setFavsMock]);

        rerender(<Favourites />);

        await waitFor(() => {
            expect(globalThis.fetch).toHaveBeenCalledWith(
                expect.stringContaining('assets=1')
            );
        });
    });
});