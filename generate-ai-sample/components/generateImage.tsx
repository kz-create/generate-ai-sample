import { Container, Flex, Select } from "@mantine/core";

export const GenerateImage = (props) => {
	return (
		<>
			<Container>
				<Select
					label="商品を選択してください"
					placeholder="Pick value"
					data={["React", "Angular", "Vue", "Svelte"]}
					defaultValue="React"
					clearable
					size="lg"
				/>
			</Container>
		</>
	);
};
