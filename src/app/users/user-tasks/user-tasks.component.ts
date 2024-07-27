import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userName = input.required<string>();
  // userId = input.required<string>();
  // userNameParams = '';
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // userName = computed(
  //   () =>
  //     this.usersService.users.find((user) => user.id === this.userId())?.name
  // );
  // ngOnInit(): void {
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) =>
  //       (this.userNameParams =
  //         this.usersService.users.find(
  //           (user) => user.id === paramMap.get('userId')
  //         )?.name ?? ''),
  //   });
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  _routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (user) => user.id === activatedRoute.paramMap.get('userId')
    )?.name ?? '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
