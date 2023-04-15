export default interface UseCaseInterface<HttpRequest, HttpResponse> {
  execute (input?: HttpRequest): Promise<HttpResponse>
}
