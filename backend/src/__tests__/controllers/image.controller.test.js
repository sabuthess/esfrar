import request from "supertest"
import { uploadImage } from "../../controllers/image.controller";
import { imageModel } from "../../models/image.model";

describe("Image controller", () => {
    describe("create a image", () => {
        it("should return 201 and image create successfully", async() => {
            const response = await request(uploadImage)
            .post("/api/image/create")
            .set("content-type", "application/json")
            .send({
                name: 
            })
        })
    })
 });