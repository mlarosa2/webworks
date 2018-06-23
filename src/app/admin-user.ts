export class AdminUser {
    constructor(
        public username: string,
        public password: string,
        public email?: string,
        public checkpassword?: string
    ) { }

    confirmPassword(): boolean {
        if (this.password === this.checkpassword) {
            return true;
        }

        return false;
    }
}
