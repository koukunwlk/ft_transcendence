<template>
	<div class="bg-red-200 container">
		<div class="grid grid-cols-4 justify-center ">

			<div class="col-span-3 bg-green-200 grid justify-center">
				<form id="image-upload-form">
					<input
						class="file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-400 hover:file:text-gray-700 file:rounded file:shadow file:font-semibold"
						type="file" id="image-file" accept="image/*" @change="onFileSelected">
				</form>
			</div>
			<div class="col-span-1 bg-green-500 content-center
			">
				<button type="button" id="upload-button" class="bg-gray-600 hover:bg-gray-400 hover:text-gray-700 text-gray-200  text-sm font-semibold py-1 px-2 border-2 border-gray-800 hover:border-gray-700 rounded shadow
				" @click="handleUpload">Upload</button>
				<img id="img" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ImageUpload",
	data() {
		return {
			imageSelected: null,
			imageToRender: null,
			imageBlob: null,
			imageSelectedSize: null,
			hideUploadButton: false
		};
	},
	methods: {
		onFileSelected(event) {
			console.log("teste");
			this.selectedFile = event.target.files[0]
			if (this.selectedFile)
				this.hideUploadButton = true;
			this.imageSelectedSize = event.target.files[0].size / 1024 / 1024;
		},

		handleUpload() {
			if (this.selectedFile) {
				if (this.validateSize()) {
					const blob = new Blob([this.selectedFile], { type: this.selectedFile.type });
					this.imageBlob = blob;
					console.log(blob);
					this.handleRender();
				} else {
					return;
				}
			}

		},
		handleRender() {
			const myImage = document.querySelector('img');
			const objectURL = URL.createObjectURL(this.imageBlob);
			myImage.src = objectURL;
		},
		validateSize() {
			if (this.imageSelectedSize > 2) {
				alert("Image size should be less than 2MB");
				this.imageSelectedSize = null;
				this.imageSelected = null;
				return null;
			} else
				return true;
		}

	},

}
</script>
