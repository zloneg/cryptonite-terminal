import axios from 'axios';
import type { CoinModel } from '../Models/CoinModel'; 

class CoinService {
    // List of 100 coins
    private readonly listUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1";

    public async getAllCoins(): Promise<CoinModel[]> {
        const response = await axios.get<CoinModel[]>(this.listUrl);
        return response.data;
    }

    // Prices for More Info (USD, EUR, ILS)
    public async getCoinDetails(id: string) {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        const prices = response.data.market_data.current_price;
        return {
            usd: prices.usd,
            eur: prices.eur,
            ils: prices.ils
        };
    }

    // AI Stats (30d, 200d changes)
    public async getAIStats(id: string) {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?market_data=true`);
        const md = response.data.market_data;
        return {
            name: response.data.name,
            current_price: md.current_price.usd,
            market_cap: md.market_cap.usd,
            change_30d: md.price_change_percentage_30d,
            change_200d: md.price_change_percentage_200d
        };
    }

    // Fear and Greed Index for Navbar
    public async getFearAndGreed() {
        const response = await axios.get('https://api.alternative.me/fng/');
        return response.data.data[0];
    }

    // Collects ALL data for a professional report
    public async getFullReportData(id: string) {
        const stats = await this.getAIStats(id);
        const prices = await this.getCoinDetails(id);
        
        return { ...stats, ...prices };
    }
}

const coinService = new CoinService();
export default coinService;