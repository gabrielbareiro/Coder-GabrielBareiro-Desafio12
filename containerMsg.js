const fs = require('fs');

class Container {
    constructor (name){
        this.name = name
    }
    async save(items) {
        try {
            const content = await fs.promises.readFile(this.name, 'utf8');
            const contentObj = JSON.parse(content);
            contentObj.push({
                email: items.email,
                hora: items.hora,
                msg: items.msg,
                id: contentObj.length + 1
            });
            await fs.promises.writeFile(this.name, JSON.stringify(contentObj, null, 2));
            console.log(`El N° de ID asignado es: ${contentObj.length}`)
        }
        catch(err) {
            console.log(err.message);
        }
    }

    async getAll() {
        try {
            const content = await fs.promises.readFile(this.name, 'utf8');
            const contentObj = JSON.parse(content);
            console.log('Show all messages');
            //console.log(contentObj);
            return contentObj;
        }
        catch(err) {
            console.log(err.message);
        }
        
    }

    async deleteAll() {
        try {
            const content = await fs.promises.writeFile(this.name, JSON.stringify([], null, 2));
            console.log('Mensajes borrados con exito!');
        }
        catch(err) {
            console.log(err.message);
        }
    }

}

module.exports = {Container};