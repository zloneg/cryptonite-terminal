import axios from 'axios';

class ReportService {
    
    public async getPrices(symbols: string[]) {
        const fsyms = symbols.join(',').toUpperCase();
        const url = `https://min-api.cryptocompare.com/data/pricemulti?tsyms=USD&fsyms=${fsyms}`;
        const response = await axios.get(url);
        return response.data; 
    }
}

const reportService = new ReportService();
export default reportService;