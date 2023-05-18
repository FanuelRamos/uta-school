import { HttpResponse } from '../utils/helpers/http'

export default interface EmailProvider {
  sendEmail(email: string, name: string): Promise<HttpResponse>
}
