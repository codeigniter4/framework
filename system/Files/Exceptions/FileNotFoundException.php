<?php namespace CodeIgniter\Files\Exceptions;

use CodeIgniter\Exceptions\ExceptionInterface;

/**
 * Class FileNotFoundException
 * @package CodeIgniter\Files\Exceptions
 */
class FileNotFoundException extends \RuntimeException implements ExceptionInterface
{

	/**
	 * @param string $path
	 *
	 * @return static
	 */
	public static function forFileNotFound(string $path)
	{
		return new static(lang('Files.fileNotFound', [$path]));
	}
}
