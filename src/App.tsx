import { createQuery } from "@tanstack/solid-query";
import { For, Show } from "solid-js";
import { fetchUsers } from "./api/apiClient";
import Card from "./components/Card/Card";
import Loader from "./components/Loader/Loader";

function App() {
  const query = createQuery(() => ["users"], fetchUsers);

  return (
    <div class="">
      <h1 class="text-2xl font-bold mb-4 text-black text-center">Наши Боты</h1>
      <Show when={!query.isLoading} fallback={<Loader />}>
        <ul class="flex flex-wrap gap-6 w-full justify-center">
          <For each={query.data}>{(user) => <Card user={user} />}</For>
        </ul>
      </Show>
    </div>
  );
}

export default App;
