import db from "../config/config.js"

export const imageModel = {
    create_image:  async ({ user_id, title, location, tags,  description, file_name, file_path}) => {
        const sql = `INSERT INTO image (user_id, title, location, tags, description,  file_name, file_path) VALUES(?, ?, ?, ?, ?, ?, ?)`

        const [result] = await db.query(sql, [
            user_id,
			title,
			location,
            tags,
            description,
			file_name,
			file_path,
			tags,
        ])

        return result;

    },
    delete_image: async({user_id, image_id}) => {
        const sql = `DELETE FROM image WHERE user_id=? AND image_id=?`
        const result = await db.query(sql, [user_id, image_id])

        return result
    },
    get_all_images: async() => {
        

    }, 
    get_a_single_image: async() => {

    },
    get_image_by_user: async()=> {

    },
    get_search_images: async() => {

    },

    // Logic of favorites
    add_to_favorites: async() => {
        
    },
    remove_from_favorites: async() => {
        
    },
    get_images_favorites_by_user: async() => {

    },
    its_on_favorites: async() => {
    },
    
    // Logic of likes

    add_to_likes: async() => {

    },

    remove_from_likes: async() => {

    },
    get_images_likes_by_user: async() => {

    },
    its_in_likes: async() => {

    }
    

} 