export function BackButton({ Text }: { Text?: string }) {
  return (
    <a
      class="md:border-4 rounded-3xl cursor-pointer px-4 py-2 w-fit text-center mb-2"
      href="/"
    >
      {Text ? (
        <div class="flex justify-center items-center text-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrow-left"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
          <span class="text-2xl">{Text}</span>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-left"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#ffffff"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
      )}
    </a>
  );
}

export function AgainButton() {
  const refreshPage = (e: Event) => {
    e.preventDefault();
    window.location.reload;
  };

  return (
    <div
      class="md:border-4 rounded-3xl cursor-pointer px-4 py-2 w-fit text-center mb-2"
      onClick={refreshPage}
    >
      <img src="../../../public/rotate-clockwise.svg" alt="" />
    </div>
  );
}
