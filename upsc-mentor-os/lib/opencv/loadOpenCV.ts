declare global {
  interface Window {
    cv: any;
  }
}

let loading: Promise<any> | null = null;

export function loadOpenCV(): Promise<any> {
  if (window.cv) {
    return Promise.resolve(window.cv);
  }

  if (loading) {
    return loading;
  }

  loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = "https://docs.opencv.org/4.x/opencv.js";
    script.async = true;

    script.onload = () => {
      const check = () => {
        if (window.cv?.Mat) {
          resolve(window.cv);
        } else {
          setTimeout(check, 100);
        }
      };

      check();
    };

    script.onerror = reject;

    document.body.appendChild(script);
  });

  return loading;
}