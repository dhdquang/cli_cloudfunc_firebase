import { Collection, getRepository } from 'fireorm';

@Collection()
class Home {
    id!: string;
    name!: string;
}

class HomeModel {
    homeRepository = getRepository(Home);
    constructor() {
    }
}
export { HomeModel, Home }