# 💰 Guía de Monetización: Activa tus Ingresos

Esta guía te explica cómo reemplazar los espacios reservados (placeholders) por anuncios reales de **Google AdSense**.

## 1. Requisitos Previos

- Tener un dominio propio (ej: `beautifier.com`).
- Una cuenta activa en [Google AdSense](https://www.google.com/adsense/).
- Que tu sitio esté aprobado por Google.

## 2. Tipos de Anuncios Configurados

En el proyecto hemos dejado 3 espacios estratégicos:

1.  **Top Leaderboard (728x90)**: Banner horizontal debajo del cabezal.
2.  **Sidebar MPU (300x250)**: Anuncio rectangular en la barra lateral.
3.  **Sticky Footer (320x50 o 728x90)**: Anuncio anclado en la parte inferior.

## 3. Cómo Implementar el Código Real

### Paso A: El Script Principal
En tu archivo `layout.tsx` (en la carpeta `app`), debes añadir el script de AdSense dentro de la etiqueta `<head>`:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

### Paso B: Reemplazar el Componente `AdPlaceholder`
He creado un componente llamado `AdPlaceholder.tsx`. Lo ideal es que crees un nuevo componente `RealAd.tsx` o modifiques el actual. 

Aquí tienes un ejemplo de cómo se ve el código de un anuncio real de AdSense en React:

```tsx
import { useEffect } from 'react';

export const RealAd = ({ slot }: { slot: string }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot={slot}
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  );
};
```

### Paso C: Ubicaciones en el Código
- **Banner Superior**: En `src/app/page.tsx`, busca la franja debajo de `<Header />`.
- **Sidebar**: En `src/components/Sidebar.tsx`, busca el contenedor al final de la biblioteca.
- **Footer**: En `src/app/page.tsx`, dentro de la etiqueta `<footer>`.

## 4. Consejos para Maximizar Ganancias 📈

- **No satures**: Demasiados anuncios espantarán a tus usuarios. El esquema actual es el equilibrio perfecto.
- **Anuncios Nativos**: Considera usar anuncios nativos (In-feed) dentro de la lista de "Presets" de fondo.
- **Tráfico**: Comparte tu herramienta en Twitter (X), Reddit y foros de desarrolladores para atraer usuarios que necesiten embellecer sus capturas.

---
*¡Mucho éxito con tu nueva plataforma monetizada!*
