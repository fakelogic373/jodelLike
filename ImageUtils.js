import { ImagePicker } from 'expo'
import { decode } from 'base64-arraybuffer'
import firebase from 'firebase'

export const pickImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({ base64: true })
    console.log('image picked: ', image.uri)
    return image
}

export const uploadImage = async (image, name) => {
    const result = await firebase.storage().ref().child('images/' + name  ).put(decode(image.base64), { contentType: 'image/jpeg' })
    console.log('image uploaded: ', result.downloadURL)
    return result.downloadURL
}