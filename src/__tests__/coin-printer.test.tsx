import { describe, expect, test, vi } from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CoinPrinter } from "@/components/coin-printer";
import type { CoinData } from "@/types.ts";

vi.mock('react-use', () => ({
    useLocalStorage: () => [[], vi.fn()]
}));

describe('CoinPrinter', () => {
    const coins: CoinData[] = [
        { id: 1,  name: "Bitcoin",      symbol: "BTC", price: 71689.42, oldPrice: 71689.42, icon: "https://example.com/btc.png", marketCap: 1434722134312 },
        { id: 2,  name: "Ethereum",     symbol: "ETH", price: 2244.31,  oldPrice: 2244.31,  icon: "https://example.com/eth.png", marketCap: 270868715608  },
        { id: 8,  name: "BNB",          symbol: "BNB", price: 612.15,   oldPrice: 612.15,   icon: "https://example.com/bnb.png", marketCap: 83470893874   },
        { id: 29, name: "Bitcoin Cash", symbol: "BCH", price: 445.38,   oldPrice: 445.38,   icon: "https://example.com/bch.png", marketCap: 8915954649    },
    ];

    test('renders a row for each coin', () => {
        render(<CoinPrinter coins={coins} />);
        // Query by the name span specifically to avoid ambiguity with symbols like BNB/BNB
        const nameSpans = document.querySelectorAll('.text-coin-name');
        const renderedNames = Array.from(nameSpans).map(el => el.textContent);
        coins.forEach(coin => {
            expect(renderedNames).toContain(coin.name);
        });
    });

    test('filters coins by name', async () => {
        render(<CoinPrinter coins={coins} />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText('Filter'), 'bitcoin');

        const nameSpans = document.querySelectorAll('.text-coin-name');
        const renderedNames = Array.from(nameSpans).map(el => el.textContent);

        expect(renderedNames).toContain('Bitcoin');
        expect(renderedNames).toContain('Bitcoin Cash');
        expect(renderedNames).not.toContain('Ethereum');
        expect(renderedNames).not.toContain('BNB');
    });

    test('filters coins by symbol', async () => {
        render(<CoinPrinter coins={coins} />);
        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText('Filter'), 'eth');

        const nameSpans = document.querySelectorAll('.text-coin-name');
        const renderedNames = Array.from(nameSpans).map(el => el.textContent);

        expect(renderedNames).toContain('Ethereum');
        expect(renderedNames).not.toContain('Bitcoin');
    });

    test('shows all coins when filter is cleared', async () => {
        render(<CoinPrinter coins={coins} />);
        const user = userEvent.setup();
        const input = screen.getByPlaceholderText('Filter');

        await user.type(input, 'bitcoin');
        await user.clear(input);

        const nameSpans = document.querySelectorAll('.text-coin-name');
        const renderedNames = Array.from(nameSpans).map(el => el.textContent);
        coins.forEach(coin => {
            expect(renderedNames).toContain(coin.name);
        });
    });

    test('renders with external favourites state', () => {
        const setFavourites = vi.fn();
        render(<CoinPrinter coins={coins} favouritesState={[[1], setFavourites]} />);

        const nameSpans = document.querySelectorAll('.text-coin-name');
        expect(nameSpans.length).toBe(coins.length);
    });
});