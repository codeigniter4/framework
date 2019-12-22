<?php namespace CodeIgniter\Log\Exceptions;

use CodeIgniter\Exceptions\ExceptionInterface;
use CodeIgniter\Exceptions\FrameworkException;

/**
 * Class LogException
 * @package CodeIgniter\Log\Exceptions
 */
class LogException extends FrameworkException implements ExceptionInterface
{

	/**
	 * @param string $level
	 *
	 * @return static
	 */
	public static function forInvalidLogLevel(string $level)
	{
		return new static(lang('Log.invalidLogLevel', [$level]));
	}

}
