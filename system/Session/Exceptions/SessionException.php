<?php namespace CodeIgniter\Session\Exceptions;

use CodeIgniter\Exceptions\ExceptionInterface;
use CodeIgniter\Exceptions\FrameworkException;

/**
 * Class SessionException
 * @package CodeIgniter\Session\Exceptions
 */
class SessionException extends FrameworkException implements ExceptionInterface
{

	/**
	 * @return static
	 */
	public static function forMissingDatabaseTable()
	{
		return new static(lang('Session.missingDatabaseTable'));
	}

	/**
	 * @param string|NULL $path
	 *
	 * @return static
	 */
	public static function forInvalidSavePath(string $path = null)
	{
		return new static(lang('Session.invalidSavePath', [$path]));
	}

	/**
	 * @param string|NULL $path
	 *
	 * @return static
	 */
	public static function forWriteProtectedSavePath(string $path = null)
	{
		return new static(lang('Session.writeProtectedSavePath', [$path]));
	}

	/**
	 * @return static
	 */
	public static function forEmptySavepath()
	{
		return new static(lang('Session.emptySavePath'));
	}

	/**
	 * @param string $path
	 *
	 * @return static
	 */
	public static function forInvalidSavePathFormat(string $path)
	{
		return new static(lang('Session.invalidSavePathFormat', [$path]));
	}
}
