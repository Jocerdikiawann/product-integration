<script lang="ts">
  import { Rive, Layout, Fit, Alignment } from "@rive-app/canvas";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { userState } from "./auth.store";

  let canvasElement: HTMLCanvasElement;
  let elapsed = $state(0);
  const duration = 1500;

  onMount(() => {
    let last_time = performance.now();
    let frame: number;

    const update = (time: number) => {
      elapsed += Math.min(time - last_time, duration - elapsed);
      last_time = time;

      if (elapsed >= duration) {
        if (!$userState?.data) {
          navigate("/signIn", { replace: true });
        } else {
          navigate("/product", { replace: true });
        }
        cancelAnimationFrame(frame);
      } else {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);

    const riv = new Rive({
      src: "https://cdn.glitch.global/452b754f-4fc5-4a20-b535-730d95888b63/loading.riv?v=1750340671016",
      canvas: canvasElement,
      autoplay: true,
      stateMachines: ["State Machine 1"],
      onLoad: () => {
        riv.resizeDrawingSurfaceToCanvas();
      },
    });
    riv.layout = new Layout({ fit: Fit.Fill, alignment: Alignment.Center });

    return () => {
      cancelAnimationFrame(frame);
      riv.stop();
    };
  });
</script>

<main>
  <div
    class="animate-pulse fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center z-50"
  >
    <canvas class="bg-center w-32 h-32" bind:this={canvasElement}> </canvas>
    <p class="bg-center w-32 h-32 text-center">Loading</p>
  </div>
</main>
