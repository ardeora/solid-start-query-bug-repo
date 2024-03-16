import { Title } from "@solidjs/meta";
import { createQuery } from "@tanstack/solid-query";
import { For, Show, Suspense } from "solid-js";
import Counter from "~/components/Counter";

export default function Home() {
  const test = createQuery(() => ({
    queryKey: ["test"],
    queryFn: async () => {
      const { message } = await fetch(
        "https://dog.ceo/api/breeds/list/all"
      ).then((res) => res.json());
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Object.keys(message);
    },
  }));

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <Suspense fallback={<p>Loading...</p>}>
        <Show when={test.data}>
          <For each={test.data}>{(breed) => <p>{breed}</p>}</For>
        </Show>
      </Suspense>
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
