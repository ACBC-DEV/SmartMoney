import RotateSvg from "../../svg/RotateSvg";
// import Rotate from "../../svg/rotate.astro";
export function BackButton({ Text }: { Text?: string }) {
	return (
		<a href="/">
			<button
				type="button"
				class="btn-s"
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
							stroke="currentColor"
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
						stroke="currentColor"
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
			</button>
		</a>
	);
}

export function AgainButton({onClick}: {onClick: (e: Event) => void}) {

	return (
		<button
			type="reset"
			class="btn-s"
			onClick={onClick}
		>
			<RotateSvg />
		</button>
	);
}

export function ButtonSubmit() {
	return (
		<button
			class="border-4 rounded-3xl w-fit mx-auto  px-4 py-2 hover:scale-105 hover:bg-white hover:text-[#333] duration-200 hover:border-white focus:outline-none focus:border-blue-500"
			type="submit"
		>
			Calcular
		</button>
	);
}
type btn = HTMLButtonElement
type TButton ={
	children:ChildNode
}

export function Button({ children }: TButton) {

	return (
		<button
			type="button"
			class="border-4 rounded-3xl w-fit mx-auto  px-4 py-2 hover:scale-105"
		>
			{children}
		</button>
	);
}
