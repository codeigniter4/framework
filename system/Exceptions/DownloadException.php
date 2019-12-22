<?php namespace CodeIgniter\Exceptions;

/**
 * Class DownloadException
 *
 * @package CodeIgniter\Exceptions
 */

class DownloadException extends \RuntimeException implements ExceptionInterface
{

	/**
	 * @param string $path
	 *
	 * @return static
	 */
	public static function forCannotSetFilePath(string $path)
	{
		return new static(lang('HTTP.cannotSetFilepath', [$path]));
	}

	/**
	 * @return static
	 */
	public static function forCannotSetBinary()
	{
		return new static(lang('HTTP.cannotSetBinary'));
	}

	/**
	 * @return static
	 */
	public static function forNotFoundDownloadSource()
	{
		return new static(lang('HTTP.notFoundDownloadSource'));
	}

	/**
	 * @return static
	 */
	public static function forCannotSetCache()
	{
		return new static(lang('HTTP.cannotSetCache'));
	}

	/**
	 * @param int    $code
	 * @param string $reason
	 *
	 * @return static
	 */
	public static function forCannotSetStatusCode(int $code, string $reason)
	{
		return new static(lang('HTTP.cannotSetStatusCode', [$code, $reason]));
	}
}
