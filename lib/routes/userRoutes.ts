import { ContactController } from "../controllers/userController";

export class Routes {
    public contactController: ContactController = new ContactController();

    public routes(app): void {
        app.route('/login')
            .post(this.contactController.login);
        app.route('/user')
            .get(this.contactController.getUsers)
            .post(this.contactController.addNewUser);
        app.route('/user/:userId')
            .get(this.contactController.getUserWithID)
            .put(this.contactController.updateUser)
            .delete(this.contactController.deleteUser);
    }
}
