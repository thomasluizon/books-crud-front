import { useState, useEffect } from 'react';
import EditInput from '../EditInput/EditInput';
import Button from '../Button/Button';
import AuthorMenu from '../AuthorMenu/AuthorMenu';

export default props => {
	const [name, setName] = useState(props.actualBook?.name || '');
	const [price, setPrice] = useState(props.actualBook?.price || '');
	const [quantity, setQuantity] = useState(props.actualBook?.quantity || '');
	const [gender, setGender] = useState(props.actualBook?.gender || '');
	const [author, setAuthor] = useState(props.actualBook?.authorName || '');
	const { editingState } = props;

	const book = {
		id: props.actualBook.id || undefined,
		name,
		price,
		quantity,
		gender,
		authorName: author,
	};

	return (
		<form
			onSubmit={e => props.handleSave(book, e)}
			className="edit-container"
		>
			{editingState !== 'create' && editingState !== 'createAuthor' ? (
				<EditInput
					label="Id"
					readOnly={true}
					value={props.actualBook?.id}
				/>
			) : (
				''
			)}

			<EditInput label="Name" value={name} setValue={setName} />

			{editingState !== 'createAuthor' ? (
				<>
					<EditInput label="Price" value={price} setValue={setPrice} />
					<EditInput
						label="Quantity"
						value={quantity}
						setValue={setQuantity}
					/>
					<EditInput label="Gender" value={gender} setValue={setGender} />
					<AuthorMenu
						label="Author"
						authors={props.authors}
						setValue={setAuthor}
						selectedAuthor={author}
						setAuthor={setAuthor}
					/>
				</>
			) : (
				''
			)}

			<div className="button-container">
				<Button onClick={() => props.setIsEditing(false)}>Cancel</Button>
				<Button type="submit">Save</Button>
			</div>
		</form>
	);
};
