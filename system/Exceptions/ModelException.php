<?php namespace CodeIgniter\Exceptions;

/**
 * Model Exceptions.
 */

class ModelException extends FrameworkException
{

	/**
	 * @param string $modelName
	 *
	 * @return static
	 */
	public static function forNoPrimaryKey(string $modelName)
	{
		return new static(lang('Database.noPrimaryKey', [$modelName]));
	}

	/**
	 * @param string $modelName
	 *
	 * @return static
	 */
	public static function forNoDateFormat(string $modelName)
	{
		return new static(lang('Database.noDateFormat', [$modelName]));
	}
}
