<?php namespace App\Controllers;

/**
 * Class Home
 * @package App\Controllers
 */
class Home extends BaseController
{

	/**
	 * @return string
	 */
	public function index()
	{
		return view('welcome_message');
	}

	//--------------------------------------------------------------------

}
