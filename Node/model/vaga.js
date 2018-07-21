class Vaga {
    constructor(name, description, salary, skills, area, differentials, isPcd, isActive){
        this.name = name;
        this.description = description;
        this.salary = salary;
        this.skills = skills; 
        this.area = area;
        this.differentials = differentials;
        this.isPcd = isPcd;
        this.isActive = isActive;
    }
}

module.exports = Vaga;