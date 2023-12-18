import { environment } from '../../../environments/environment';

// API - Endpoints
const { baseUrl } = environment;
export const apiUrl = `${baseUrl}/api`;

// TIME LOG

// Export excel
export const EXPORT_EXCEL = `${apiUrl}/UploadFile/UploadExcelFile`;
