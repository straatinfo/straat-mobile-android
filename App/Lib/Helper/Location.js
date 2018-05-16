class Location {

    static myInstance = null;

    /**
     * @returns {Location}
     */
    static getInstance() {
        if (this.myInstance == null) {
            this.myInstance = new Location();
        }

        return myInstance;
    }

}

export default Location