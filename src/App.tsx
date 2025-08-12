import { createQuery } from "@tanstack/solid-query";
import { For, Show } from "solid-js";
import { fetchUsers } from "./api/apiClient";
import Card from "./components/Card/Card";
import Loader from "./components/Loader/Loader";

function App() {
  const query = createQuery(() => ["users"], fetchUsers, {
    retry: 1,
    onError: (error) => {
      console.error("Ошибка при загрузке пользователей:", error);
      alert(
        `Ошибка загрузки данных:\n${
          error instanceof Error ? error.message : String(error)
        }`
      );
    },
  });

  return (
    <div>
      <h1 class="text-2xl font-bold mb-4 text-black text-center">Наши Боты</h1>

      <Show
        when={!query.isError}
        fallback={
          <p class="text-red-600 font-semibold text-center p-4">
            Сервис недоступен:{" "}
            {query.error instanceof Error
              ? query.error.message
              : String(query.error)}
          </p>
        }
      >
        <Show
          when={query.isLoading}
          fallback={
            <ul class="flex flex-wrap gap-6 w-full justify-center">
              <For each={query.data}>{(user) => <Card user={user} />}</For>
            </ul>
          }
        >
          <Loader />
        </Show>
      </Show>
    </div>
  );
}

export default App;
