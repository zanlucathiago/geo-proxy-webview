// Salva a referência original da API, se disponível
const originalGeolocation = navigator.geolocation;

// Substitui a API de geolocalização
navigator.geolocation = {
  getCurrentPosition: function (successCallback, errorCallback, options) {
    if (originalGeolocation && originalGeolocation.getCurrentPosition) {
      // Usa a API original se ela existir
      originalGeolocation.getCurrentPosition(successCallback, errorCallback, options);
    } else {
      // Envia uma mensagem para a webview solicitando a localização
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: "requestLocation" })
        );
      } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.postMessage) {
        window.webkit.messageHandlers.postMessage.postMessage({
          type: "requestLocation",
        });
      } else {
        // Trata cenários onde a webview não suporta postMessage
        if (typeof errorCallback === "function") {
          errorCallback({
            code: 2, // Código de erro: POSITION_UNAVAILABLE
            message: "Geolocation is not supported and no webview communication is available.",
          });
        }
      }

      // Espera por uma mensagem de resposta da webview
      const handleMessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "location") {
            const { latitude, longitude, accuracy } = data;
            if (typeof successCallback === "function") {
              successCallback({
                coords: {
                  latitude,
                  longitude,
                  accuracy: accuracy || 0,
                },
                timestamp: Date.now(),
              });
            }
          }
        } catch (e) {
          if (typeof errorCallback === "function") {
            errorCallback({
              code: 3, // Código de erro: TIMEOUT ou INVALID_MESSAGE
              message: "Invalid location message received.",
            });
          }
        } finally {
          window.removeEventListener("message", handleMessage);
        }
      };

      // Adiciona o listener de mensagens
      window.addEventListener("message", handleMessage, { once: true });
    }
  },
  watchPosition: function () {
    console.warn("watchPosition is not implemented in this proxy.");
  },
  clearWatch: function () {
    console.warn("clearWatch is not implemented in this proxy.");
  },
};
