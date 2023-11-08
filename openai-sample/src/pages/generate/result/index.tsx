import {
	Box,
	Button,
	Checkbox,
	Container,
	Flex,
	Group,
	Image,
	Loader,
	Select,
	Space,
	Text,
	TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function GenerateResultPage() {
	const router = useRouter();
	const flag = useRef(false);
	const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!flag.current) {
			flag.current = true;
			return;
		}
		if (
			router.query["imagePath"] === undefined ||
			router.query["prompt"] === undefined
		)
			return;

		const fetchOpenAi = async () => {
			setLoading(true);
			const response = await fetch("/api/openai", {
				method: "POST",
				body: JSON.stringify({
					filePath: `src/${router.query["imagePath"]}` as string,
					prompt: router.query["prompt"] as string,
				}),
			});
			if (!response.ok) {
				console.log("error status: ", response.status);
				return;
			}

			response
				.json()
				.then((v) => setGeneratedImageUrl(v[0].url))
				.finally(() => setLoading(false));
		};

		fetchOpenAi();
	}, [router.query]);

	return (
		<Container size="xs">
			<Group justify="center" mt="md">
				{loading ? (
					<>
						<Flex direction="column">
							<Text>画像を生成しています。少々お待ちください。</Text>
							<Group justify="center" mt="md">
								<Loader />
							</Group>
						</Flex>
					</>
				) : (
					<>
						<Flex direction="column">
							<Text>生成画像</Text>
							<Image src={generatedImageUrl} h={512} w="auto" fit="contain" />
						</Flex>
					</>
				)}
			</Group>
		</Container>
	);
}
