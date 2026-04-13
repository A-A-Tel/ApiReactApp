import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CoinInfo } from '@/components/coin-info'; // Adjust path
import type { CoinInfoData } from '@/types.ts';

const mockCoinInfo: CoinInfoData = {
    id: 343,
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'eth-icon.png',
    price: 6000,
    oldPrice: 7000,
    marketCap: 123442342432,
    launchDate: new Date('2015-07-30T00:00:00'),
    dayChange: 2.5,
    weekChange: -5.1234567,
    monthChange: 10.0,
    description: 'Ethereum is a **decentralized** blockchain.'
};

describe('CoinInfo Component', () => {
    it('renders basic coin identity details', () => {
        render(<CoinInfo {...mockCoinInfo} />);

        expect(screen.getByText('Ethereum')).toBeInTheDocument();
        expect(screen.getByText('ETH')).toBeInTheDocument();
        const icon = screen.getByAltText('icon') as HTMLImageElement;
        expect(icon.src).toContain('eth-icon.png');
    });

    it('formats the launch date correctly', () => {
        render(<CoinInfo {...mockCoinInfo} />);

        const dateText = mockCoinInfo.launchDate.toLocaleString();
        expect(screen.getByText(new RegExp(dateText))).toBeInTheDocument();
    });

    it('applies green color classes for positive changes', () => {
        render(<CoinInfo {...mockCoinInfo} />);

        const dayChangeSpan = screen.getByText(/2.500000%/);
        expect(dayChangeSpan).toHaveClass('text-green-500');
    });

    it('applies red color classes for negative changes and handles precision', () => {
        render(<CoinInfo {...mockCoinInfo} />);

        const weekChangeSpan = screen.getByText(/-5.123457%/);
        expect(weekChangeSpan).toHaveClass('text-red-500');
    });

    it('renders markdown description correctly', () => {
        render(<CoinInfo {...mockCoinInfo} />);

        const boldText = screen.getByText('decentralized');
        expect(boldText.tagName).toMatch(/STRONG|B/);
        expect(screen.getByText(/Ethereum is a/)).toBeInTheDocument();
    });
});