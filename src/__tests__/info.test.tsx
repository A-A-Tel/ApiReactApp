import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { Info } from '@/pages/info';
import { useParams, useLocation } from 'wouter';

vi.mock('wouter', () => ({
    useParams: vi.fn(),
    useLocation: vi.fn(),
}));

vi.mock('@/components/header', () => ({ Header: () => <div>Header</div> }));
vi.mock('@/components/coin-info', () => ({
    CoinInfo: ({ name }: { name: string }) => <div>Coin Name: {name}</div>
}));

describe('Info Page', () => {
    const mockSetLocation = vi.fn();

    beforeEach(() => {
        vi.mocked(useLocation).mockReturnValue(['/', mockSetLocation]);

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                Data: {
                    '1': {
                        ID: 1,
                        NAME: 'Bitcoin',
                        PRICE_USD: 50000,
                        LAUNCH_DATE: 1234567890,
                    }
                }
            })
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('polls for new data every 3 seconds', async () => {
        vi.useFakeTimers();
        vi.mocked(useParams).mockReturnValue({ id: '1' });

        render(<Info />);

        expect(globalThis.fetch).toHaveBeenCalledTimes(1);

        await act(async () => {
            vi.advanceTimersByTime(3000);
        });
        expect(globalThis.fetch).toHaveBeenCalledTimes(2);

        await act(async () => {
            vi.advanceTimersByTime(3000);
        });
        expect(globalThis.fetch).toHaveBeenCalledTimes(3);
    });

    it('clears the interval on unmount', async () => {
        vi.useFakeTimers();
        vi.mocked(useParams).mockReturnValue({ id: '1' });

        const { unmount } = render(<Info />);
        expect(globalThis.fetch).toHaveBeenCalledTimes(1);

        unmount();

        await act(async () => {
            vi.advanceTimersByTime(3000);
        });

        expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });
});