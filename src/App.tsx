import {
  createSignal,
  createMemo,
  Show,
  For,
  onMount,
  onCleanup,
} from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import { fetchUsers } from "./api/apiClient";
import Card from "./components/Card/Card";
import Loader from "./components/Loader/Loader";

const TOTAL_USERS = 10;
const REFRESH_INTERVAL = 600000;

function App() {
  const [page, setPage] = createSignal(1);
  const [limit, setLimit] = createSignal(4);

  const start = createMemo(() => (page() - 1) * limit());

  const query = createQuery(
    () => ["users", start(), limit()],
    () => fetchUsers({ start: start(), limit: limit() }),
    {
      keepPreviousData: true,
      structuralSharing: false,
      retry: 1,
      onError: (error) => {
        console.error("Ошибка при загрузке пользователей:", error);
        alert(
          `Ошибка загрузки данных:\n${
            error instanceof Error ? error.message : String(error)
          }`
        );
      },
    }
  );

  const totalPages = createMemo(() => Math.ceil(TOTAL_USERS / limit()));

  onMount(() => {
    const intervalId = setInterval(() => {
      query.refetch();
    }, REFRESH_INTERVAL);

    onCleanup(() => clearInterval(intervalId));
  });

  return (
    <div class="mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6 text-center text-black">Наши Боты</h1>

      <Show when={!query.isLoading && !query.isError}>
        <div class="flex justify-center mb-4">
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => query.refetch()}
            disabled={query.isFetching}
          >
            {query.isFetching ? "Обновление данных..." : "Обновить"}
          </button>
        </div>
        <div class="mb-4 flex justify-center gap-4 items-center">
          <span class="text-black">Показывать по:</span>
          {[4, 8, 12].map((num) => (
            <button
              class={`px-3 py-1 rounded ${
                limit() === num
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => {
                setPage(1);
                setLimit(num);
              }}
            >
              {num}
            </button>
          ))}
        </div>
        <div class="flex justify-center my-6 gap-2">
          <button
            class="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page() === 1}
            onClick={() => setPage(page() - 1)}
          >
            Назад
          </button>

          <For each={Array.from({ length: totalPages() }, (_, i) => i + 1)}>
            {(pageNum) => (
              <button
                class={`px-3 py-1 rounded border ${
                  page() === pageNum
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </button>
            )}
          </For>

          <button
            class="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page() === totalPages()}
            onClick={() => setPage(page() + 1)}
          >
            Вперед
          </button>
        </div>
      </Show>
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
        <Show when={!query.isLoading} fallback={<Loader />}>
          <ul class="flex flex-wrap gap-6 justify-center">
            <For each={query.data}>{(user) => <Card user={user} />}</For>
          </ul>
        </Show>
      </Show>
    </div>
  );
}

export default App;
