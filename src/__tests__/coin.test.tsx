import { describe, expect, test, vi } from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Coin } from "@/components/coin";
import type { CoinData } from "@/types.ts";

vi.mock('wouter', () => ({
    Link: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
        <a href={href} className={className}>{children}</a>
    ),
}));

const baseCoin: CoinData = {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: 'https://example.com/btc.png',
    price: 50000,
    oldPrice: 50000,
    marketCap: 1000000000,
};

const renderCoin = (
    coinOverrides: Partial<CoinData> = {},
    favourites: number[] = [],
    setFavourites = vi.fn()
) =>
    render(
        <Coin
            coin={{ ...baseCoin, ...coinOverrides }}
            favourites={favourites}
            setFavourites={setFavourites}
        />
    );

describe('Coin', () => {
    describe('rendering', () => {
        test('renders the coin name', () => {
            renderCoin();
            expect(screen.getByText('Bitcoin')).toBeInTheDocument();
        });

        test('renders the coin symbol', () => {
            renderCoin();
            expect(screen.getByText('BTC')).toBeInTheDocument();
        });

        test('renders the market cap formatted to 2 decimal places', () => {
            renderCoin({ marketCap: 1234567.891 });
            expect(screen.getByText('$1234567.89')).toBeInTheDocument();
        });

        test('renders the price rounded to 2 decimal places', () => {
            renderCoin({ price: 49999.999 });
            expect(screen.getByText('$50000')).toBeInTheDocument();
        });

        test('renders the coin icon', () => {
            renderCoin();
            const img = screen.getByRole('img', { name: 'Crypto' });
            expect(img).toHaveAttribute('src', 'https://example.com/btc.png');
        });

        test('links to the correct info page', () => {
            renderCoin();
            expect(screen.getByRole('link')).toHaveAttribute('href', '/info/1');
        });
    });

    describe('price percentage change', () => {
        test('shows no percentage when price equals oldPrice', () => {
            renderCoin({ price: 50000, oldPrice: 50000 });
            expect(screen.queryByText(/%/)).not.toBeInTheDocument();
        });

        test('shows green positive percentage when price increased', () => {
            renderCoin({ price: 55000, oldPrice: 50000 });
            const pct = screen.getByText(/^\+10\.000000%$/);
            expect(pct).toHaveClass('text-green-500');
        });

        test('shows red negative percentage when price decreased', () => {
            renderCoin({ price: 45000, oldPrice: 50000 });
            const pct = screen.getByText(/^-10\.000000%$/);
            expect(pct).toHaveClass('text-red-500');
        });
    });

    describe('favourite button', () => {
        test('shows "Favourite" when coin is not in favourites', () => {
            renderCoin({}, []);
            expect(screen.getByRole('button')).toHaveTextContent('Favourite');
        });

        test('shows "Unfavourite" when coin is already in favourites', () => {
            renderCoin({}, [1]);
            expect(screen.getByRole('button')).toHaveTextContent('Unfavourite');
        });

        test('calls setFavourites with the coin id added when favouriting', async () => {
            const setFavourites = vi.fn();
            renderCoin({}, [2, 3], setFavourites);
            await userEvent.click(screen.getByRole('button'));
            expect(setFavourites).toHaveBeenCalledWith([2, 3, 1]);
        });

        test('calls setFavourites with the coin id removed when unfavouriting', async () => {
            const setFavourites = vi.fn();
            renderCoin({}, [1, 2, 3], setFavourites);
            await userEvent.click(screen.getByRole('button'));
            expect(setFavourites).toHaveBeenCalledWith([2, 3]);
        });
    });
});