import Controller from '@ember/controller';

export default class AdminUsersController extends Controller {
  columns = [
    { propertyName: 'name', title: 'Name' },
    { propertyName: 'email', title: 'Email' },
    { propertyName: 'dateJoined', title: 'Date Joined' },
    { propertyName: 'role', title: 'Role' },
    { propertyName: 'verificationStatus', title: 'Status' },
  ];
}
