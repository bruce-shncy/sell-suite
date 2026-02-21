<?php

namespace App\Http\Controllers;

use App\Services\OauthService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class OauthController extends Controller
{
    public function __construct(
       private OauthService $oAuthService
    )
    {
        $this->oAuthService = $oAuthService;
    }
    public function redirect(): RedirectResponse
    {
       return $this->oAuthService->redirect();
    }


    public function callback(): RedirectResponse
    {

      return  $this->oAuthService->callback();
    } 

}
