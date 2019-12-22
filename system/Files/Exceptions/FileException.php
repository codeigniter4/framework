<?php namespace CodeIgniter\Files\Exceptions;

use CodeIgniter\Exceptions\ExceptionInterface;

/**
 * Class FileException
 * @package CodeIgniter\Files\Exceptions
 */
class FileException extends \RuntimeException implements ExceptionInterface
{

	/**
	 * @param string|NULL $from
	 * @param string|NULL $to
	 * @param string|NULL $error
	 *
	 * @return static
	 */
	public static function forUnableToMove(string $from = null, string $to = null, string $error = null)
	{
		return new static(lang('Files.cannotMove', [$from, $to, $error]));
	}

}
