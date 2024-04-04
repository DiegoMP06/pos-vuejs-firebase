import {ref, computed} from 'vue';
import {useFirebaseStorage} from 'vuefire';
import { ref as storageRef, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {uid} from 'uid'

export default function useImage() {
    const storage = useFirebaseStorage();
    const url = ref(null);
    
    const onFileChange = e => {
        const file = e.target.files[0];
        const sRef = storageRef(storage, `/products/${uid()}.jpg`);
        
        const uploadTask = uploadBytesResumable(sRef, file);

        uploadTask.on('state_changed', 
            () => {}, 
            error => console.log(error), 
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(downloadURL => url.value = downloadURL)
                    .catch(error => console.log(error));
            });
    } 

    const isImageUploaded = computed(() => {
        return url.value ? url.value : null;
    });

    return {  
        url,
        onFileChange,
        isImageUploaded,
    };
}