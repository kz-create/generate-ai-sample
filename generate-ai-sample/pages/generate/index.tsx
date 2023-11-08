import { GenerateImage } from "@/components/generateImage";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
			</Head>
			<GenerateImage />
		</>
	);
}
