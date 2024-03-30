import fs from "fs";
import path from "path";

const fpath = "../data/restaurants.json"
const __dirname = path.resolve()

const read = () => {
    const f = fs.readFileSync(path.join(__dirname, "0401", fpath), 'utf-8');
    return JSON.parse(f);
}

const write = (data) => {
    fs.writeFileSync(path.join(__dirname,"0401", fpath), JSON.stringify(data))
}

export default {
    getAll: async (req, res) => {
        return res.status(200).json({restaurants: read()})
    },
    post: async (req, res) => {
        const {name, address, phone} = req.body;
        const json = read()
        if(json.filter((restaurant) => restaurant.name == name).length >= 1) return res.status(400).json({error: "이미 해당 맛집 정보가 존재합니다."})
        json.push({ name, address, phone });
        write(json)
        return res.status(201).json({ name, address, phone })
    },
    getOneByName: async (req,res) => {
        const { name } = req.params;
        const json = read()
        const item = json.filter((restaurant) => {
            return restaurant.name == name
        })
        if(item.length == 0) return res.status(404).json({error: "해당 맛집 정보가 존재하지 않습니다."})
        return res.status(200).json(item[0]);
    },
    patchOneByName: async (req, res) => {
        const { name } = req.params;
        const {address,phone} = req.body;
        const json = read()
        for(let i = 0; i<json.length; i++) {
            if(json[i].name == name) {
                json[i].address = (address != "") ? address : json[i].address
                json[i].phone = (phone != "") ? phone: json[i].phone
                write(json)
                return res.status(200).json({name, address, phone});
            }
        }
        
        return res.status(404).json({error: "해당 맛집 정보가 존재하지 않습니다."})

    },
    deleteOneByName: async (req, res) => {
        const { name } = req.params;
        const json = read()
        const find = json.filter((restaurant) => {
            return restaurant.name == name
        })
        if(find.length == 0) return res.status(404).json({error: "해당 맛집 정보가 존재하지 않습니다."})
        const filtered = json.filter((restaurant) => {
            return restaurant.name != name
        })
        write(filtered)
        return res.status(200).json(find[0]);
    }

}