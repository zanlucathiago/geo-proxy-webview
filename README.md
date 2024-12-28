# GeoProxyWebView

Um proxy para a API de geolocalização que integra suporte para webviews em aplicativos híbridos (React Native, iOS, etc.). Este script substitui a implementação padrão de `navigator.geolocation` para:
- Usar a API de geolocalização original do navegador, se disponível.
- Solicitar localização via `postMessage` em webviews que suportam comunicação com o aplicativo host.
- Tratar cenários onde a geolocalização não é suportada ou está indisponível.

## Recursos

- **Compatível com WebViews**: Suporte para `window.ReactNativeWebView` e `webkit.messageHandlers`.
- **Fallback Inteligente**: Garante um comportamento funcional mesmo em ambientes sem suporte nativo à geolocalização.
- **Interface Familiar**: Implementa métodos como `getCurrentPosition` com suporte para callbacks de sucesso e erro.

---

## Como Usar

1. **Importe o script no seu site ou aplicativo web:**

   Adicione o seguinte trecho no HTML do seu site:
   ```html
   <script src="https://zanlucathiago.github.io/geo-proxy-webview/geo-proxy-webview.js"></script>
2. **Configure seu aplicativo para responder a mensagens de localização:**

   No aplicativo React Native ou iOS, implemente a lógica para enviar mensagens de localização em resposta a requestLocation.
