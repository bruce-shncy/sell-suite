<?php 

namespace App\Services;

use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

class OauthService 
{

    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }


    public function callback(): RedirectResponse
    {
        $frontEndUrl = config('app.frontend_url');

        if (blank($frontEndUrl)) {
            abort(500, 'frontend_url is not configured');
        }


        try {
              $oauthUser = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            Log::warning('Google OAuth failed', ['error' => $e->getMessage()]);
            return redirect($frontEndUrl . '/login?error=google_auth_failed');
        }

         return $this->linkUserSocial($oauthUser, $frontEndUrl);

    }

    private function linkUserSocial($oauthUser, string $frontEndUrl): RedirectResponse
    {
        $user = DB::transaction(function () use ($oauthUser)  {
            // Already linked ? 
            $social = SocialAccount::where('provider', 'google')
                        ->where('provider_user_id', $oauthUser->getId())
                        ->first();

            if ($social) {
                return $social->user;
            }

            $oauthUserEmail = $oauthUser->getEmail();
            $user = User::where('email', $oauthUserEmail )->first();

            // if user email is not registered to the system throw an error
            if (!$user) {
               return null;
            }

            $user->createSocialAccount('google', $oauthUser);

            if (!$user->hasVerifiedEmail()) {
                $user->markEmailAsVerified();
            }

            return $user;
        });

        if (!$user) {
            return redirect($frontEndUrl . '/login?error=no_account');
        }

        Auth::login($user, remember: true);
        
        session()->regenerate();

        return redirect($frontEndUrl . '/auth/callback');

    }


}