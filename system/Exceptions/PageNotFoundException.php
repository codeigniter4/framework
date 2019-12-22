<?php namespace CodeIgniter\Exceptions;

/**
 * Class PageNotFoundException
 * @package CodeIgniter\Exceptions
 */
class PageNotFoundException extends \OutOfBoundsException implements ExceptionInterface
{
	/**
	 * Error code
	 *
	 * @var integer
	 */
	protected $code = 404;

	/**
	 * @param string|NULL $message
	 *
	 * @return static
	 */
	public static function forPageNotFound(string $message = null)
	{
		return new static($message ?? lang('HTTP.pageNotFound'));
	}

	/**
	 * @return static
	 */
	public static function forEmptyController()
	{
		return new static(lang('HTTP.emptyController'));
	}

	/**
	 * @param string $controller
	 * @param string $method
	 *
	 * @return static
	 */
	public static function forControllerNotFound(string $controller, string $method)
	{
		return new static(lang('HTTP.controllerNotFound', [$controller, $method]));
	}

	/**
	 * @param string $method
	 *
	 * @return static
	 */
	public static function forMethodNotFound(string $method)
	{
		return new static(lang('HTTP.methodNotFound', [$method]));
	}
}
