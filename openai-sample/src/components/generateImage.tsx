import {
	Box,
	Button,
	Checkbox,
	Container,
	Flex,
	Group,
	Image,
	Select,
	Space,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export const GenerateImage = (props) => {
	const router = useRouter();
	const form = useForm({
		initialValues: {
			age: "",
			sex: "",
			income: "",
			marriage: "",
		},
	});
	const products = [
		{
			name: "調理家電",
			id: "1",
			imagePath: "asset/food-processor-PhotoRoom.png",
		},
		{ name: "フライパン", id: "2", imagePath: "asset/fryingpan.png" },
		{ name: "スニーカー", id: "3", imagePath: "asset/sneakers_01_red.png" },
		{ name: "掃除機", id: "4", imagePath: "asset/souziki.png" },
	];
	const [selectedItem, setSelectedItem] = useState<string>("");
	const [prompt, setPrompt] = useState<string>("");
	const selectedImagePath = useMemo(
		() => products.find((v) => v.name === selectedItem)?.imagePath,
		[selectedItem],
	);

	return (
		<>
			<Container size="xs">
				<Space h="md" />
				<Select
					label="商品を選択してください"
					placeholder="Pick value"
					data={["調理家電", "フライパン", "スニーカー", "掃除機"]}
					clearable
					size="sm"
					value={selectedItem}
					onChange={setSelectedItem}
				/>
				<Space h="xs" />
				<Text>商品画像</Text>
				<Image src={selectedImagePath} h={200} w="auto" fit="contain" />
				<Space h="md" />
				<Text>ターゲット詳細</Text>
				<Space h="xs" />
				<form
					onSubmit={form.onSubmit((values) => {
						console.log(values);
					})}
				>
					<Box>
						<Flex gap={{ base: "sm", sm: "lg" }} mb="8px">
							<Select
								label="年代"
								data={["10代", "20代", "30代", "40代", "50代", "60代", "70代"]}
								{...form.getInputProps("age")}
							/>
							<Select
								label="性別"
								data={["男性", "女性"]}
								{...form.getInputProps("sex")}
							/>
						</Flex>
						<Flex gap={{ base: "sm", sm: "lg" }}>
							<Select
								label="収入"
								data={[
									"200万円~400万円",
									"400万円~600万円",
									"600万円~800万円",
									"800万円~1000万円",
									"1000万円~",
								]}
								{...form.getInputProps("income")}
							/>
							<Select
								label="既婚/未婚"
								data={["既婚", "未婚"]}
								{...form.getInputProps("marriage")}
							/>
						</Flex>
					</Box>
					<Space h="md" />
					<Text>プロンプトキーワード</Text>
					<TextInput
						description="キーワードを入力（イメージや〇〇風が伝わるものテイストのイメージ）"
						placeholder="白、鮮やかな空、モダン"
						value={prompt}
						onChange={(event) => setPrompt(event.currentTarget.value)}
					/>
					<Space h="md" />
					<Text>生成対象</Text>
					<Space h="xs" />
					<Checkbox label="商品画像" />
					<Space h="xs" />
					<Checkbox disabled label="商品コピー" />
					<Space h="xs" />
					<Checkbox disabled label="商品タイトル" />
					<Space h="xs" />
					<Checkbox disabled label="商品説明文" />
					<Space h="xl" />
					<Group justify="center" mt="md">
						<Button
							type="submit"
							color="violet"
							onClick={() => {
								const inputPrompt = `${form.getInputProps("age").value}の${
									form.getInputProps("sex").value
								},収入は${form.getInputProps("income").value}, ${
									form.getInputProps("marriage").value
								}, ${prompt}`;
								console.log("prompt", inputPrompt);

								router.push({
									pathname: "/generate/result",
									query: {
										imagePath: selectedImagePath,
										prompt: inputPrompt,
									},
								});
							}}
						>
							生成
						</Button>
					</Group>
				</form>
			</Container>
		</>
	);
};
