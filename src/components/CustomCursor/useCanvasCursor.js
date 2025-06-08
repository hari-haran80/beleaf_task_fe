import { useEffect, useRef } from 'react';

const useCanvasCursor = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const linesRef = useRef([]);
  const fRef = useRef(null);
  const animationFrameRef = useRef(null);

  const E = {
    debug: true,
    friction: 0.5,
    trails: 20,
    size: 50,
    dampening: 0.25,
    tension: 0.98,
  };

  class Node {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
    }
  }

  class Oscillator {
    constructor(e = {}) {
      this.init(e);
    }

    init(e) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
    }

    update() {
      this.phase += this.frequency;
      return this.offset + Math.sin(this.phase) * this.amplitude;
    }
  }

  class Line {
    constructor(e = {}) {
      this.init(e);
    }

    init(e) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (let n = 0; n < E.size; n++) {
        const node = new Node();
        node.x = posRef.current.x;
        node.y = posRef.current.y;
        this.nodes.push(node);
      }
    }

    update() {
      let e = this.spring;
      let t = this.nodes[0];
      t.vx += (posRef.current.x - t.x) * e;
      t.vy += (posRef.current.y - t.y) * e;
      for (let i = 0, a = this.nodes.length; i < a; i++) {
        t = this.nodes[i];
        if (i > 0) {
          let n = this.nodes[i - 1];
          t.vx += (n.x - t.x) * e;
          t.vy += (n.y - t.y) * e;
          t.vx += n.vx * E.dampening;
          t.vy += n.vy * E.dampening;
        }
        t.vx *= this.friction;
        t.vy *= this.friction;
        t.x += t.vx;
        t.y += t.vy;
        e *= E.tension;
      }
    }

    draw() {
      const ctx = ctxRef.current;
      let a, e, t, n, i;
      n = this.nodes[0].x;
      i = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(n, i);
      for (a = 1; a < this.nodes.length - 2; a++) {
        e = this.nodes[a];
        t = this.nodes[a + 1];
        n = 0.5 * (e.x + t.x);
        i = 0.5 * (e.y + t.y);
        ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      e = this.nodes[a];
      t = this.nodes[a + 1];
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

  const onMousemove = (e) => {
    const c = (e) => {
      if (e.touches) {
        posRef.current.x = e.touches[0].pageX;
        posRef.current.y = e.touches[0].pageY;
      } else {
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
      }
      e.preventDefault();
    };

    const l = (e) => {
      if (e.touches.length === 1) {
        posRef.current.x = e.touches[0].pageX;
        posRef.current.y = e.touches[0].pageY;
      }
    };

    document.removeEventListener('mousemove', onMousemove);
    document.removeEventListener('touchstart', onMousemove);
    document.addEventListener('mousemove', c);
    document.addEventListener('touchmove', c);
    document.addEventListener('touchstart', l);
    c(e);
    initializeLines();
    render();
  };

  const initializeLines = () => {
    linesRef.current = [];
    for (let e = 0; e < E.trails; e++) {
      linesRef.current.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }));
    }
  };

  const render = () => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = `hsla(${Math.round(fRef.current.update())},50%,50%,0.2)`;
      ctx.lineWidth = 1;
      for (let t = 0; t < E.trails; t++) {
        const line = linesRef.current[t];
        line.update();
        line.draw();
      }
      animationFrameRef.current = requestAnimationFrame(render);
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth - 20;
      canvas.height = window.innerHeight;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      ctxRef.current = canvas.getContext('2d');
      ctxRef.current.running = true;
      ctxRef.current.frame = 1;
      fRef.current = new Oscillator({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
      });

      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('touchstart', onMousemove);
      window.addEventListener('resize', resizeCanvas);
      window.addEventListener('orientationchange', resizeCanvas);
      window.addEventListener('focus', () => {
        if (!ctxRef.current.running) {
          ctxRef.current.running = true;
          render();
        }
      });
      window.addEventListener('blur', () => {
        ctxRef.current.running = false;
      });

      resizeCanvas();
      initializeLines();
      render();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('focus', () => {
        if (!ctxRef.current.running) {
          ctxRef.current.running = true;
          render();
        }
      });
      window.removeEventListener('blur', () => {
        ctxRef.current.running = false;
      });
    };
  }, []);

  return canvasRef;
};

export default useCanvasCursor;