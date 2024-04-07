import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../services/user-service';

export const authGuard = (shouldBeAdmin?: boolean) => {
  return async () => {
    const router = inject(Router);
    const userService = inject(UserService);

    const isLogged = userService.isUserLogged();
    console.log(isLogged)

    if (!isLogged) {
      return router.navigate([ '/' ]);
    }

    const user = userService.user();

    if (!user) {
      const responseStatus = await userService.setUserFromDatabase();

      if (responseStatus !== 200) {
        return router.navigate([ '/' ]);
      }
    }

    if (!shouldBeAdmin) {
      return true;
    }

    if (shouldBeAdmin && (userService.isUserAdmin())) {
      return true;
    }

    return router.navigate([ '/dashboard' ]);
  }
}
