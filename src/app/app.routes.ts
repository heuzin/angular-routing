import {
  CanMatchFn,
  RedirectCommand,
  Route,
  Router,
  Routes,
  UrlSegment,
} from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  UserTasksComponent,
  resolveTitle,
  resolveUserName,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No task selected',
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    loadChildren: () =>
      import('./users/users.routes').then((module) => module.routes),
    canMatch: [dummyCanMatch],
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
