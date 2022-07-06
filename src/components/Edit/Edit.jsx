import { useState, useEffect } from 'react';
import EditInput from '../EditInput/EditInput';
import Button from '../Button/Button';
import AuthorMenu from '../AuthorMenu/AuthorMenu';

export default props => {
	const [authorId, setAuthorId] = useState('');
	const [name, setName] = useState(
		props.actualBook?.name || props.actualAuthor?.name || ''
	);
	const [price, setPrice] = useState(props.actualBook?.price || '');
	const [quantity, setQuantity] = useState(props.actualBook?.quantity || '');
	const [gender, setGender] = useState(props.actualBook?.gender || '');
	const [author, setAuthor] = useState(props.actualBook?.authorName || '');
	const { editingState } = props;

	const payload = {
		id:
			props.actualBook?.id ||
			props.actualAuthor?.id ||
			authorId ||
			undefined,
		name,
		price,
		quantity,
		gender,
		authorName: author,
	};

	return (
		<form
			onSubmit={e =>
				editingState === 'deleteAuthor'
					? props.handleDelete(authorId, 'authors', e)
					: props.handleSave(payload, e)
			}
			className="edit-container"
		>
			{editingState === 'deleteAuthor' && (
				<AuthorMenu
					label="Author"
					authors={props.authors}
					setValue={setAuthor}
					selectedAuthor={author}
					setAuthor={setAuthor}
					setAuthorId={setAuthorId}
				/>
			)}

			{editingState !== 'create' && editingState !== 'createAuthor' ? (
				<EditInput
					label="Id"
					readOnly={true}
					value={props.actualBook?.id || props.actualAuthor.id || authorId}
				/>
			) : (
				''
			)}
			{editingState !== 'deleteAuthor' && (
				<EditInput label="Name" value={name} setValue={setName} />
			)}

			{editingState !== 'createAuthor' &&
			editingState !== 'editingAuthor' &&
			editingState !== 'deleteAuthor' ? (
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
				<Button
					onClick={() => {
						props.setIsEditing(false);
						props.setActualAuthor(false);
						props.setActualBook(false);
					}}
				>
					Cancel
				</Button>
				<Button type="submit">
					{editingState === 'deleteAuthor' ? 'Delete' : 'Save'}
				</Button>
			</div>
		</form>
	);
};
